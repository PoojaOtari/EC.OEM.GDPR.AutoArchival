using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace trial.api.Data
{
    public class SQLquery
    {
        [Key]
        public int Query_ID { get; set; }
        public string Query_Name { get; set; }

    }
}
