using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clicker_universe_be.Classes.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }

        // refresh token time to live (in days), inactive tokens are
        // automatically deleted from the database after this time
        public int RefreshTokenTTL { get; set; }
    }
}
