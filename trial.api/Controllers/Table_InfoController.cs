using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using trial.api.Data;

namespace trial.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class Table_InfoController : ControllerBase
    {
        private readonly db_context _context;

        public Table_InfoController(db_context context)
        {
            _context = context;
        }

        // GET: api/Table_Info
        [HttpGet]
        public IEnumerable<table> Gettables()
        {
            return _context.tables;
        }

        // GET: api/Table_Info/5/1
        [HttpGet("{serverid}/{dbid}")]
        public async Task<IActionResult> Gettable([FromRoute] int serverid, [FromRoute] int dbid )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var servername = from d in _context.servers
                         where d.Server_ID == serverid
                         select d;

            var reqservername = "";
            foreach (var d in servername)
            {
                reqservername = d.Server_Name;
            }

            var reqdbname = "";


            var dbname = from d in _context.databases
                         where d.database_id == dbid
                         select d;


            foreach (var d in dbname)
            {
                reqdbname = d.name;
            }

            //IEnumerable<table> result = from d in _context.tables
            //                            //where d.Database_Id == id
            //                            select d;

            CustomConnection obj = new CustomConnection(serverid, reqservername);
            IEnumerable<tableInfo> result = obj.ConnectTables(dbid);
            //IEnumerable<tableInfo> result = CustomConnectionForTables.ExecuteReader(reqservername, reqdbname, "sys.tables", serverid);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // PUT: api/Table_Info/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Puttable([FromRoute] int id, [FromBody] table table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != table.Table_Id)
            {
                return BadRequest();
            }

            _context.Entry(table).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tableExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Table_Info
        [HttpPost]
        public async Task<IActionResult> Posttable([FromBody] table table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.tables.Add(table);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Gettable", new { id = table.Table_Id }, table);
        }

        // DELETE: api/Table_Info/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletetable([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var table = await _context.tables.FindAsync(id);
            if (table == null)
            {
                return NotFound();
            }

            _context.tables.Remove(table);
            await _context.SaveChangesAsync();

            return Ok(table);
        }

        private bool tableExists(int id)
        {
            return _context.tables.Any(e => e.Table_Id == id);
        }
    }
}