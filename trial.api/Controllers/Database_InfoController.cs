using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using trial.api.Data;
using static Microsoft.AspNetCore.Hosting.Internal.HostingApplication;


namespace trial.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class Database_InfoController : ControllerBase
    {
        private readonly db_context _context;

        public Database_InfoController(db_context context)
        {
            _context = context;
        }

        // GET: api/Database_Info
        [HttpGet]
        public IEnumerable<db> GetDatabase_Info()
        {

            return _context.databases;
        }

        // GET: api/Database_Info/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDatabase_Info([FromRoute] int id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var servername = from d in _context.servers
                             where d.Server_ID == id
                             select d;

            var ServerName="";
            foreach (var d in servername)
            {
                ServerName = d.Server_Name;
            }

            // CustomConnection.CreateConnection(ans,"master","vwsysdatabases");
            /*     IEnumerable<db> result = from d in _context.databases
                                          where d.Server_Id == id && d.Database_Name!= "Instrumentation" 
                                          select d;

         */
            CustomConnection obj = new CustomConnection(id, ServerName);

            IEnumerable<DbInfo> result = obj.ConnectDB();

            //ConnectServer(Server_Info.Server_Name,result.Database_Name)
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // PUT: api/Database_Info/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDatabase_Info([FromRoute] int id, [FromBody] db database_Info)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != database_Info.database_id)
            {
                return BadRequest();
            }

            _context.Entry(database_Info).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Database_InfoExists(id))
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

        // POST: api/Database_Info
        [HttpPost]
        public async Task<IActionResult> PostDatabase_Info([FromBody] db database_Info)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.databases.Add(database_Info);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDatabase_Info", new { id = database_Info.database_id }, database_Info);
        }

        // DELETE: api/Database_Info/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDatabase_Info([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var database_Info = await _context.databases.FindAsync(id);
            if (database_Info == null)
            {
                return NotFound();
            }

            _context.databases.Remove(database_Info);
            await _context.SaveChangesAsync();

            return Ok(database_Info);
        }

        private bool Database_InfoExists(int id)
        {
            return _context.databases.Any(e => e.database_id == id);
        }
    }
}