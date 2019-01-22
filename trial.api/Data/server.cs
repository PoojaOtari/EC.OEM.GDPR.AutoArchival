using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace trial.api.Data
{
    [Table("Server_Info")]
    public class server
    {
        [Key]
        public int Server_ID {get; set;}
        public string Server_Name { get; set; }
        public string DataSource_Name { get; set; }
    }
}
