using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using VFHealthAPI.Models;

namespace VFHealthAPI.Models;

public class Patient
{
    public int Id { get; set; }

    [Required]
    public string FullName { get; set; } = string.Empty;

    public int Age { get; set; }

    public string Condition { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.Now;
}

public class Appointment
{
    public int Id { get; set; }

    [Required]
    public string PatientName { get; set; } = string.Empty;

    public DateTime Date { get; set; }

    public string Status { get; set; } = "Scheduled";
}

namespace VFHealthAPI.Data;

public class HMSContext : DbContext
{
    public HMSContext(DbContextOptions<HMSContext> options) : base(options) { }

    public DbSet<Patient> Patients { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Invoice> Invoices { get; set; }
}