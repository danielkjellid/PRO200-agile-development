using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace VyShare.Models.Dto
{
    public class ContactDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public ContactDto()
        {
            // Empty ctor needed for deserialization
        }

        public ContactDto(Contact contact)
        {
            Id = contact.Id;
            FirstName = contact.FirstName;
            LastName = contact.LastName;
        }

        public Contact ToContact(Contact contact = null)
        {
            if (contact == null)
            {
                contact = new Contact();
            }
            contact.FirstName = FirstName;
            contact.LastName = LastName;
            return contact;
        }

    }
}