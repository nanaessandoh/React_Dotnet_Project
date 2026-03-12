using Read = Domain.Read;
using Write = Domain.Write;
using Entities = Domain.Entities;
using System.Linq;
using System;
using AutoMapper;

namespace API.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            Guid? currentUserId = null;

            CreateMap<Write.Activity, Entities.Activity>();

            CreateMap<Entities.Activity, Read.Activity>()
                .ForMember(dest => dest.HostDisplayName, opt => opt.MapFrom(src => src.Attendees.FirstOrDefault(a => a.IsHost)!.User!.DisplayName))
                .ForMember(dest => dest.HostUserId, opt => opt.MapFrom(src => src.Attendees.FirstOrDefault(a => a.IsHost)!.UserId));

            CreateMap<Entities.ActivityAttendee, Read.ActivityAttendee>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.User!.DisplayName))
                .ForMember(dest => dest.Bio, opt => opt.MapFrom(src => src.User!.Bio))
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.User!.ImageUrl));

            CreateMap<Entities.Comment, Read.Comment>()
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.User.DisplayName))
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.User.ImageUrl));

            CreateMap<Entities.User, Read.UserProfile>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Following, opt => opt.MapFrom(src => src.Followers.Any(f => f.FollowerId == currentUserId)))
                .ForMember(dest => dest.FollowersCount, opt => opt.MapFrom(src => src.Followers.Count))
                .ForMember(dest => dest.FollowingCount, opt => opt.MapFrom(src => src.Followings.Count));

            CreateMap<Entities.ActivityAttendee, Read.UserProfile>()
                .ForMember(dest => dest.DisplayName, opts => opts.MapFrom(src => src.User!.DisplayName))
                .ForMember(dest => dest.Bio, opts => opts.MapFrom(src => src.User!.Bio))
                .ForMember(dest => dest.ImageUrl, opts => opts.MapFrom(src => src.User!.ImageUrl))
                .ForMember(dest => dest.Following, opt => opt.MapFrom(src => src.User!.Followers.Any(f => f.FollowerId == currentUserId)))
                .ForMember(dest => dest.FollowersCount, opt => opt.MapFrom(src => src.User!.Followers.Count))
                .ForMember(dest => dest.FollowingCount, opt => opt.MapFrom(src => src.User!.Followings.Count));
        }
    }
}