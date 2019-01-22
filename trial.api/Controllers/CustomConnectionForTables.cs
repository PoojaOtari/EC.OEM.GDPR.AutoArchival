using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Diagnostics;
using trial.api.Data;

namespace trial.api.Controllers
{

    class CustomConnectionForTables
    {

        public static IEnumerable<tableInfo> ExecuteReader(string servername, string dbname, string tablename, int serverid)
        {
            try
            {
                return executeReader(servername, dbname, tablename, serverid);
            }
            catch (Exception ex)
            {
                return null;
                // your handling code here
            }
        }
        private static IEnumerable<tableInfo> executeReader(string servername, string dbname, string tablename, int serverid)
        {
            // same code as you have above in your example

            string connstring = "Server = " + servername + "; Database = " + dbname + "; Trusted_Connection = True; MultipleActiveResultSets = true";

            string query = "select * from " + tablename;

            using (SqlConnection cn = new SqlConnection(connstring))
            {
                cn.Open();
                using (SqlCommand cmd = new SqlCommand(query, cn))
                {
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            yield return new tableInfo { object_id = Convert.ToInt32(reader["object_id"]), name = reader["name"].ToString()};
                        }
                    }
                }
            }
        }


        public static void CreateConnection(string servername, string dbname, string tablename)
        {

            string connstring = "Server = " + servername + "; Database = " + dbname + "; Trusted_Connection = True; MultipleActiveResultSets = true";



            string query = "select * from " + tablename;

            using (SqlConnection conn = new SqlConnection(connstring))
            {
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    try
                    {
                        conn.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                Debug.WriteLine(reader[0].ToString());
                            }

                        }

                        reader.Close();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }
                    finally
                    {
                        conn.Close();
                    }
                    Console.ReadLine();

                }
            }
        }
    }

}

