﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace clicker_universe_be.EFModels
{
    public partial class Users
    {
        public Users()
        {
            RefreshTokens = new HashSet<RefreshTokens>();
        }

        public int IdUser { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }

        public virtual ICollection<RefreshTokens> RefreshTokens { get; set; }
    }
}