// Script para insertar datos de prueba en la BD de auditoría
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'exam2-audit.db');
const db = new sqlite3.Database(dbPath);

const testData = [
  {
    exam2p_entity: 'User',
    exam2p_recordId: 101,
    exam2p_action: 'DELETE',
    exam2p_user: 'admin',
    exam2p_detail: 'Usuario eliminado del sistema'
  },
  {
    exam2p_entity: 'Order',
    exam2p_recordId: 202,
    exam2p_action: 'DELETE',
    exam2p_user: 'system',
    exam2p_detail: 'Orden cancelada automáticamente'
  },
  {
    exam2p_entity: 'Product',
    exam2p_recordId: 303,
    exam2p_action: 'DELETE',
    exam2p_user: 'admin',
    exam2p_detail: 'Producto descontinuado'
  },
  {
    exam2p_entity: 'Customer',
    exam2p_recordId: 404,
    exam2p_action: 'DELETE',
    exam2p_user: 'support',
    exam2p_detail: 'Cliente dado de baja por inactividad'
  },
  {
    exam2p_entity: 'Invoice',
    exam2p_recordId: 505,
    exam2p_action: 'DELETE',
    exam2p_user: 'finance',
    exam2p_detail: 'Factura anulada'
  }
];

db.serialize(() => {
  console.log('📊 Creando tabla si no existe...');
  
  db.run(`
    CREATE TABLE IF NOT EXISTS exam2_audit_log (
      logId INTEGER PRIMARY KEY AUTOINCREMENT,
      exam2p_entity VARCHAR(255) NOT NULL,
      exam2p_recordId INTEGER NOT NULL,
      exam2p_action VARCHAR(50) NOT NULL,
      exam2p_user VARCHAR(255),
      exam2p_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      exam2p_detail TEXT
    )
  `);

  console.log('🗑️ Eliminando datos anteriores...');
  db.run('DELETE FROM exam2_audit_log');

  console.log('✅ Insertando datos de prueba...\n');
  
  const stmt = db.prepare(`
    INSERT INTO exam2_audit_log 
    (exam2p_entity, exam2p_recordId, exam2p_action, exam2p_user, exam2p_detail)
    VALUES (?, ?, ?, ?, ?)
  `);

  testData.forEach((record, index) => {
    stmt.run(
      record.exam2p_entity,
      record.exam2p_recordId,
      record.exam2p_action,
      record.exam2p_user,
      record.exam2p_detail,
      (err) => {
        if (err) {
          console.error(`❌ Error insertando registro ${index + 1}:`, err);
        } else {
          console.log(`✅ Registro ${index + 1}: ${record.exam2p_action} ${record.exam2p_entity} by ${record.exam2p_user}`);
        }
      }
    );
  });

  stmt.finalize(() => {
    console.log('\n✨ Datos de prueba insertados correctamente');
    
    db.all('SELECT * FROM exam2_audit_log ORDER BY exam2p_timestamp DESC', (err, rows) => {
      if (err) {
        console.error('❌ Error consultando:', err);
      } else {
        console.log('\n📋 Registros en BD:', rows.length);
        rows.forEach(row => {
          console.log(`  - ID ${row.logId}: ${row.exam2p_action} ${row.exam2p_entity} (Usuario: ${row.exam2p_user})`);
        });
      }
      db.close();
    });
  });
});
