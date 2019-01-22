using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace trial.api.Data
{
    //[Table("vwsysdatabases")]
    public class DbInfo
    {
        [Key]
        public int database_id { get; set; }
        public int Server_Id { get; set; }
        public string name { get; set; }
    }


}
