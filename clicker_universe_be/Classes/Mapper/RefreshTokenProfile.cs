using AutoMapper;
using clicker_universe_be.EFModels;
using clicker_universe_be.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clicker_universe_be.Classes.Mapper
{
    public class RefreshTokenProfile : Profile
    {
        public RefreshTokenProfile()
        {
            CreateMap<RefreshTokens, RefreshToken>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Token, opt => opt.MapFrom(src => src.Token))
                .ForMember(dest => dest.Expires, opt => opt.MapFrom(src => src.Expires))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
                .ForMember(dest => dest.CreatedByIp, opt => opt.MapFrom(src => src.CreatedByIp))
                .ForMember(dest => dest.Revoked, opt => opt.MapFrom(src => src.Revoked))
                .ForMember(dest => dest.RevokedByIp, opt => opt.MapFrom(src => src.RevokedByIp))
                .ForMember(dest => dest.ReplacedByToken, opt => opt.MapFrom(src => src.ReplacedByToken))
                .ForMember(dest => dest.ReasonRevoked, opt => opt.MapFrom(src => src.ReasonRevoked))
            .ReverseMap()
                .ForMember(dest => dest.IdUserNavigation, opt => opt.Ignore());
        }
    }
}
