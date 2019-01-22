using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace trial.api.Data
{
    [Table("SAPPurgeTableList")]
    public class SAPPurgeTable
    {
        [Key]
        public int TableID { get; set; }
        public string SourceTableName { get; set; }
        public string PurgeTableName { get; set; }
        public string ArchiveTableName { get; set; }
        public int Sequenceid { get; set; }
        public Int16 Status { get; set; }
        public int GroupID { get; set; }
        public string PurgeOnly { get; set; }
        public string Selectjoinquery { get; set; }
        public string Deletequery { get; set; }
        public string QueryBased { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
