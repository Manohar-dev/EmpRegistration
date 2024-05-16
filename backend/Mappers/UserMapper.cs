using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.User;
using backend.Models;

namespace backend.Mappers
{
    public static class UserMapper
    {
         public static UserDto ToUserDto(this User usermodel )
        {
            return new UserDto
            {
                id = usermodel.id,
                username = usermodel.username,
                comments = usermodel.comments
            };
        }

        public static User ToUserFromCreateDto(this CreateUserRequest  UserDto)
        {
            return new User
            {
                username = UserDto.username,
                comments = UserDto.comments
            };
        }


    }
}