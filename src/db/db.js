const Pool = require('pg').Pool

const pool = new Pool({
	user: 'opnkrxgm',
	password: 'aTz-wTTfTGm1J-uy3Lwatss8n8Tc7Wse',
	database: 'opnkrxgm',
	host: 'satao.db.elephantsql.com',
	port: 5432
})

const fetch = async (SQL, ...params) => {

	const client = await pool.connect()

	try {
		
		const { rows } = await client.query(SQL, params)

		return rows

	} catch(e) {
		console.log(e)
	} finally {

		client.release()
	
	}

}

module.exports.fetch = fetch
