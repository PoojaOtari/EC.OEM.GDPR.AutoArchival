using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace trial.api.Data
{
    public class table
    {   [Key]
        public int Table_Id { get; set; }
        //public int Server_Id { get; set; }
        //public int Database_Id { get; set; }
        public string Table_Name { get; set; }
    }
}
