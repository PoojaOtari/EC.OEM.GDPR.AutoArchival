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
    public class stgSAPPurgeTableListsController : ControllerBase
    {
        private readonly db_context _context;

        public stgSAPPurgeTableListsController(db_context context)
        {
            _context = context;
        }

        // GET: api/stgSAPPurgeTableLists
        [HttpGet]
        public IEnumerable<stgSAPPurgeTableList> GetstgSAPPurgeTableList()
        {
            return _context.stgSAPPurgeTableList;
        }

        // GET: api/stgSAPPurgeTableLists/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetstgSAPPurgeTableList([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stgSAPPurgeTableList = await _context.stgSAPPurgeTableList.FindAsync(id);

            if (stgSAPPurgeTableList == null)
            {
                return NotFound();
            }

            return Ok(stgSAPPurgeTableList);
        }

        // PUT: api/stgSAPPurgeTableLists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutstgSAPPurgeTableList([FromRoute] int id, [FromBody] stgSAPPurgeTableList stgSAPPurgeTableList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != stgSAPPurgeTableList.TableID)
            {
                return BadRequest();
            }

            _context.Entry(stgSAPPurgeTableList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!stgSAPPurgeTableListExists(id))
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

        // POST: api/stgSAPPurgeTableLists
        [HttpPost]
        public async Task<IActionResult> PoststgSAPPurgeTableList([FromBody] stgSAPPurgeTableList[] stgSAPPurgeTableList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            for (int i = 0; i < stgSAPPurgeTableList.Length; i++)
            {
                _context.stgSAPPurgeTableList.Add(stgSAPPurgeTableList[i]);
            }

            //await _context.SaveChangesAsync();
            _context.SaveChanges();

            CustomConnection obj = new CustomConnection();                    //hard coded the server id

            IEnumerable<JobInfo> result = obj.DeployAll();

            return CreatedAtAction("GetstgSAPPurgeTableList", new { id = stgSAPPurgeTableList[0].TableID }, stgSAPPurgeTableList);
        }

        // DELETE: api/stgSAPPurgeTableLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletestgSAPPurgeTableList([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stgSAPPurgeTableList = await _context.stgSAPPurgeTableList.FindAsync(id);
            if (stgSAPPurgeTableList == null)
            {
                return NotFound();
            }

            _context.stgSAPPurgeTableList.Remove(stgSAPPurgeTableList);
            await _context.SaveChangesAsync();

            return Ok(stgSAPPurgeTableList);
        }

        private bool stgSAPPurgeTableListExists(int id)
        {
            return _context.stgSAPPurgeTableList.Any(e => e.TableID == id);
        }
    }
}