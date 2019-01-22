using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace trial.api.Data
{
    public class tableInfo
    {   [Key]
        public int object_id { get; set; }
        public string name { get; set; }
        public string DBname { get; set; }
    }
}
