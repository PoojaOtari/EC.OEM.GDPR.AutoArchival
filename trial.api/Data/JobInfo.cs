using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace trial.api.Data
{
    public class JobInfo
    {
        [Key]
        public string JobId { get; set; }
        public int ServerId { get; set; }
        public string ServerName { get; set; }
        public string JobName { get; set; }
        public string RunStatus { get; set; }
        public DateTime? NextScheduledRun { get; set; }
        public string Message { get; set; }
        public int? EmailedTo { get; set; }
        public int? RunDate { get; set; }
        public int? RunTime { get; set; }
        public int? TimeTaken { get; set; }
        public DateTime? StartedDate { get; set; }
        public DateTime? StopExecutionDate { get; set;}
    }
}
