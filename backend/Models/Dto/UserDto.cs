using System;

namespace VyShare.Models.Dto
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public UserDto()
        {
            // Empty ctor needed for deserialization
        }
        
        public UserDto(User user)
        {
            Id = user.Id;
            Username = user.Username;
            FirstName = user.FirstName;
            LastName = user.LastName;
        }

        public User ToUser(User user = null)
        {
            if (user == null)
            {
                user = new User();
            }
            user.Username = Username;
            user.FirstName = FirstName;
            user.LastName = LastName;
            return user;
        }

    }
}