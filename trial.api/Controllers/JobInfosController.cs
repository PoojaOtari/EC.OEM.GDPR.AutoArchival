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

    public class JobInfosController : ControllerBase
    {
        private readonly db_context _context;

        public JobInfosController(db_context context)
        {
            _context = context;
        }

        // GET: api/JobInfos/id/name
        [HttpGet("{id}/{name}")]
        public async Task<IActionResult> GetJobInfo([FromRoute] int id, [FromRoute] string name)
        {
       
            CustomConnection obj = new CustomConnection(id,name);                    //hard coded the server id

            IEnumerable<JobInfo> result = obj.ConnectJobs();

            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        // GET: api/JobInfos/id/jobname
        [HttpGet("{id}/{jobName}/{x}")]
        public async Task<IActionResult> ExecuteJob([FromRoute] int id, [FromRoute] string jobName,[FromRoute] int x)
        {


            var servername = from d in _context.servers
                             where d.Server_ID == id
                             select d;

            var ServerName = "";
            foreach (var d in servername)
            {
                ServerName = d.Server_Name;
            }


            CustomConnection obj = new CustomConnection(id , ServerName);                    //hard coded the server id

            IEnumerable<JobInfo> result = obj.ExecuteJob(jobName);

            return Ok("Return Statement");
        }

        // PUT: api/JobInfos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobInfo([FromRoute] string id, [FromBody] JobInfo jobInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != jobInfo.JobName)
            {
                return BadRequest();
            }

            _context.Entry(jobInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobInfoExists(id))
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

        // POST: api/JobInfos
        [HttpPost]
        public async Task<IActionResult> PostJobInfo([FromBody] JobInfo jobInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.JobInfo.Add(jobInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJobInfo", new { id = jobInfo.JobName }, jobInfo);
        }

        // DELETE: api/JobInfos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobInfo([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var jobInfo = await _context.JobInfo.FindAsync(id);
            if (jobInfo == null)
            {
                return NotFound();
            }

            _context.JobInfo.Remove(jobInfo);
            await _context.SaveChangesAsync();

            return Ok(jobInfo);
        }

        private bool JobInfoExists(string id)
        {
            return _context.JobInfo.Any(e => e.JobName == id);
        }
    }
}