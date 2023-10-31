﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TwitterClone_backend_.Context;

namespace TwitterClone_backend_.Models;

public partial class TwitterContext : DbContext
{
    public TwitterContext()
    {
    }

    public TwitterContext(DbContextOptions<TwitterContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Tweet> Tweets { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-LKCHDGI\\SQLEXPRESS;Initial Catalog=Twitter;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tweet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Twwet");

            entity.ToTable("Tweet");

            entity.Property(e => e.Content).HasMaxLength(50);
            entity.Property(e => e.CreatedAt)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Likes).HasDefaultValueSql("((0))");

            entity.HasOne(d => d.User).WithMany(p => p.Tweets)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Tweet_User");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__User__3214EC07F451E864");

            entity.ToTable("User");

            entity.Property(e => e.Dob)
                .HasMaxLength(255)
                .HasColumnName("DOB");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.FirstName).HasMaxLength(255);
            entity.Property(e => e.LastName).HasMaxLength(255);
            entity.Property(e => e.Password).HasMaxLength(255);
            entity.Property(e => e.UserName).HasMaxLength(255);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}