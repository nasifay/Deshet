/**
 * Centralized exports for all database models
 * This file provides a single import point for all models and their types
 */

// User
export { default as User, type IUser, type UserRole } from './User';

// News/Blog
export {
  default as NewsPost,
  default as BlogPost,
  type INewsPost,
  type IBlogPost,
} from './NewsPost';

// Page
export { default as Page, type IPage } from './Page';

// Program/Service
export {
  default as Program,
  default as Service,
  type IProgram,
  type IService,
} from './Program';

// Product
export { default as Product, type IProduct } from './Product';

// Booking
export { default as Booking, type IBooking } from './Booking';

// Appointment
export { default as Appointment, type IAppointment } from './Appointment';

// Site Settings
export { default as SiteSettings, type ISiteSettings } from './SiteSettings';

// Media (Note: Media model uses IGallery interface, exported as IMedia for clarity)
export { default as Media } from './Media';
export type { IGallery as IMedia } from './Media';

// Volunteer (deprecated)
export { default as Volunteer, type IVolunteer } from './Volunteer';

// Gallery
export { default as Gallery, type IGallery } from './Gallery';
export { default as GalleryCategory, type IGalleryCategory } from './GalleryCategory';

// Contact
export { default as Contact, type IContact } from './Contact';

// Bank Options
export { default as BankOption, type IBankOption } from './BankOption';

// Key Funder
export { default as KeyFunder, type IKeyFunder } from './KeyFunder';

// Supporter
export { default as Supporter, type ISupporter } from './Supporter';

// History
export { default as History, type IHistory } from './History';

// Testimonial
export { default as Testimonial, type ITestimonial } from './Testimonial';

