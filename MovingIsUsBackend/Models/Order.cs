namespace Models
{
    public class Order
    {
        public Order() {
            OrderId = Guid.NewGuid().ToString();
        }

        public string OrderId { get; set; }
        public string? Name { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? AddressFrom { get; set; }
        public string? AddressTo { get; set; }
        public DateTime OrderDate { get; set; }
        public string? Note { get; set; }
        public List<Service>? Services { get; set; } 
    }
}