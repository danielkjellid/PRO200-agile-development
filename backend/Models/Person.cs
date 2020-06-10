namespace VyShare.Models
{
    public class Person : Entity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Name => FirstName + " " + LastName;
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}