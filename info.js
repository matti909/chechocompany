const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapearNormativa() {
  // Lanzar navegador headless (sin interfaz visual)
  const browser = await chromium.launch({
    headless: true, // Sin interfaz visual para mejor performance
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // Mejor compatibilidad
  });

  const context = await browser.newContext({
    // Simular un navegador real para evitar detección de bots
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    viewport: { width: 1280, height: 720 }
  });

  const page = await context.newPage();

  try {
    console.log('🚀 Iniciando scraping de Normativa Nacional...');

    // Configurar timeout más corto
    page.setDefaultTimeout(15000);

    await page.goto('https://www.argentina.gob.ar/normativa/nacional/decreto-883-2020-344131/texto', {
      waitUntil: 'domcontentloaded', // Más rápido que 'networkidle'
      timeout: 15000
    });

    // Esperar contenido principal
    await page.waitForSelector('h1, .main-content, main', { timeout: 10000 });

    // Extraer datos de forma más robusta
    const datosExtraidos = await page.evaluate(() => {
      // Función helper para limpiar texto
      const cleanText = (text) => text?.trim().replace(/\s+/g, ' ') || '';

      // Extraer título principal
      const titulo = document.querySelector('h1')?.textContent || 'Sin título';

      // Extraer párrafos con contenido relevante
      const parrafos = Array.from(document.querySelectorAll('p'))
        .map(p => cleanText(p.textContent))
        .filter(text => text.length > 20) // Solo párrafos con contenido sustancial
        .slice(0, 10); // Limitar a los primeros 10 párrafos más relevantes

      // Extraer encabezados estructurados
      const encabezados = Array.from(document.querySelectorAll('h2, h3, h4'))
        .map(h => ({
          nivel: h.tagName.toLowerCase(),
          texto: cleanText(h.textContent),
          id: h.id || null
        }))
        .filter(h => h.texto.length > 0);

      // Extraer enlaces relevantes (solo internos y oficiales)
      const enlaces = Array.from(document.querySelectorAll('a[href]'))
        .map(a => ({
          texto: cleanText(a.textContent),
          url: a.href,
          esInterno: a.href.includes('argentina.gob.ar')
        }))
        .filter(link =>
          link.texto.length > 0 &&
          link.texto.length < 100 &&
          (link.esInterno || link.url.includes('pdf'))
        )
        .slice(0, 15); // Limitar a enlaces más relevantes

      // Extraer información específica sobre trámites o requisitos
      const requisitos = Array.from(document.querySelectorAll('ul li, ol li'))
        .map(li => cleanText(li.textContent))
        .filter(text =>
          text.length > 10 &&
          text.length < 200 &&
          (text.includes('requiere') || text.includes('debe') || text.includes('necesario'))
        );

      return {
        titulo: cleanText(titulo),
        resumen: parrafos[0] || 'Sin resumen disponible',
        parrafos,
        encabezados,
        enlaces,
        requisitos,
        metadatos: {
          totalParrafos: parrafos.length,
          totalEncabezados: encabezados.length,
          totalEnlaces: enlaces.length,
          totalRequisitos: requisitos.length
        }
      };
    });

    // Estructurar datos para la web de noticias
    const articuloFormateado = {
      id: `normativa_${Date.now()}`,
      titulo: datosExtraidos.titulo,
      resumen: datosExtraidos.resumen,
      contenido: datosExtraidos.parrafos.join('\n\n'),
      categoria: 'Normativa',
      tags: ['Decreto 883/2020', 'Cannabis Medicinal', 'Argentina', 'Regulación'],
      fechaExtraccion: new Date().toISOString(),
      fechaPublicacion: new Date().toISOString().split('T')[0], // Solo fecha
      fuente: {
        nombre: 'Argentina.gob.ar',
        url: page.url(),
        confiable: true
      },
      secciones: datosExtraidos.encabezados.map(h => ({
        titulo: h.texto,
        nivel: h.nivel
      })),
      enlacesRelacionados: datosExtraidos.enlaces.filter(e => e.esInterno).slice(0, 5),
      requisitos: datosExtraidos.requisitos,
      imagen: '/images/reprocann-default.jpg', // Placeholder
      estado: 'publicado',
      destacado: false,
      metadatos: datosExtraidos.metadatos
    };

    // Crear directorio si no existe
    const directorioData = path.join(__dirname, 'src', 'data');
    if (!fs.existsSync(directorioData)) {
      fs.mkdirSync(directorioData, { recursive: true });
    }

    // Guardar JSON optimizado para la web
    const archivoWeb = path.join(directorioData, 'noticias-normativa.json');
    fs.writeFileSync(archivoWeb, JSON.stringify(articuloFormateado, null, 2), 'utf-8');
    console.log(`✅ Datos optimizados guardados en: ${archivoWeb}`);

    // Guardar también un backup completo
    const archivoBackup = `backup_normativa_${Date.now()}.json`;
    const datosCompletos = {
      ...articuloFormateado,
      datosOriginales: datosExtraidos,
      configuracion: {
        scrapeadoEn: new Date().toISOString(),
        version: '2.0',
        headless: true
      }
    };

    fs.writeFileSync(archivoBackup, JSON.stringify(datosCompletos, null, 2), 'utf-8');
    console.log(`💾 Backup completo guardado en: ${archivoBackup}`);

    return articuloFormateado;

  } catch (error) {
    console.error('❌ Error durante el scraping:', error.message);

    // Intentar capturar información del error para debugging
    const errorInfo = {
      mensaje: error.message,
      timestamp: new Date().toISOString(),
      url: page.url(),
      codigo: error.code || 'UNKNOWN'
    };

    fs.writeFileSync(`error_scraping_${Date.now()}.json`, JSON.stringify(errorInfo, null, 2));
    throw error;
  } finally {
    await browser.close();
    console.log('🔒 Navegador cerrado');
  }
}

// Ejecutar el scraper
if (require.main === module) {
  scrapearNormativa()
    .then(datos => {
      console.log('\n📊 Resumen de extracción:');
      console.log(`- Título: ${datos.titulo}`);
      console.log(`- Categoría: ${datos.categoria}`);
      console.log(`- Párrafos: ${datos.metadatos.totalParrafos}`);
      console.log(`- Enlaces: ${datos.metadatos.totalEnlaces}`);
      console.log(`- Requisitos: ${datos.metadatos.totalRequisitos}`);
      console.log(`- Archivo generado: src/data/noticias-normativa.json`);
      console.log('\n✨ Scraping completado exitosamente!');
      console.log('\n🔗 Ejecuta el siguiente comando para ver el resultado:');
      console.log('cat src/data/noticias-normativa.json | head -20');
    })
    .catch(error => {
      console.error('💥 Error fatal:', error.message);
      console.log('\n🔍 Posibles soluciones:');
      console.log('- Verifica tu conexión a internet');
      console.log('- La página web podría estar temporalmente no disponible');
      console.log('- Instala Playwright: npm install playwright');
      console.log('- Instala los navegadores: npx playwright install');
      process.exit(1);
    });
}

module.exports = { scrapearNormativa };
