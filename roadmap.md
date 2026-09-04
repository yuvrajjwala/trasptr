# Eagle Black Limo — Build Roadmap

## Goal: turn the static prototype into a real app (auth + persistent bookings + live rides)

### Done — "Make it real" milestone
- [x] DB migration: `profiles` + `bookings` tables (RLS + GRANTs)
- [x] Real auth: create-account / sign-in / forgot-password (email+password) + Google
- [x] `_authenticated` layout; move home/booking/rides/track/profile/notifications under it
- [x] onAuthStateChange in `__root`; sign-out in profile
- [x] Booking "Confirm Booking" at step 5 → save booking to DB → go to My Rides
- [x] My Rides lists real bookings (upcoming + completed)
- [x] Home "next ride" from real data (or empty CTA)
- [x] Profile shows signed-in email + sign out
- [x] Verify build + preview end-to-end (Playwright signup → book → rides → home → profile → sign-out)

### Later
- [ ] Payment/checkout step (Stripe)
- [ ] Live chauffeur tracking data
