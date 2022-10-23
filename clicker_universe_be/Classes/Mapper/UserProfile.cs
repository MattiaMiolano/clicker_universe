using AutoMapper;
using clicker_universe_be.EFModels;
using clicker_universe_be.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clicker_universe_be.Classes.Mapper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<Users, User>()
                .ForMember(dest => dest.IdUser, opt => opt.MapFrom(src => src.IdUser))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Username))
                .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.PasswordHash))
                .ForMember(dest => dest.RefreshTokens, opt => opt.MapFrom(src => src.RefreshTokens))
            .ReverseMap()
                .ForMember(dest => dest.RefreshTokens, opt => opt.Ignore());
        }
    }
}
