const mysql = require('mysql2/promise');

async function test() {
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Senthil@2003',
      database: 'mbmct_db'
    });
    const [tables] = await conn.query('SHOW TABLES');
    console.log('Tables:', tables.map(t => Object.values(t)[0]).join(', '));
    const [d] = await conn.query('SELECT COUNT(*) as c FROM donations');
    console.log('Donations count:', d[0].c);
    const [c] = await conn.query('SELECT COUNT(*) as c FROM contacts');
    console.log('Contacts count:', c[0].c);
    const [v] = await conn.query('SELECT COUNT(*) as c FROM volunteers');
    console.log('Volunteers count:', v[0].c);
    const [b] = await conn.query('SELECT COUNT(*) as c FROM beneficiaries');
    console.log('Beneficiaries count:', b[0].c);
    await conn.end();
    console.log('DB OK - Connected!');
  } catch(e) {
    console.error('DB Error:', e.message);
  }
}
test();
