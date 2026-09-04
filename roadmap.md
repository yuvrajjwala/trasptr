# Eagle Black Limo — Build Roadmap

## Goal: turn the static prototype into a real app (auth + persistent bookings + live rides)

### In progress — "Make it real" milestone
- [ ] DB migration: `profiles` + `bookings` tables (RLS + GRANTs)
- [ ] Real auth: create-account / sign-in / forgot-password (email+password) + Google
- [ ] `_authenticated` layout; move home/booking/rides/track/profile/notifications under it
- [ ] onAuthStateChange in `__root`; sign-out in profile
- [ ] Booking "Continue" at step 5 → save booking to DB → go to My Rides
- [ ] My Rides lists real bookings (upcoming + completed)
- [ ] Home "next ride" from real data (or empty CTA)
- [ ] Profile shows signed-in email + sign out
- [ ] Verify build + preview end-to-end

### Later
- [ ] Payment/checkout step (Stripe)
- [ ] Live chauffeur tracking data
