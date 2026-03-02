type maritalStatus = "married" | "unmarried" | "prefer not say" | "seperated";

export interface IUserDetails {
  user_id: String;
  dob: String;
  profile_photo: String;
  background_img: String;
  bio: String;
  occupation: String;
  education: String;
  location: {
    lat: String;
    lon: String;
  };
  marital_status: maritalStatus;
  children: Number;
  preferred_family_system: String;
  requirements: [String];
  deal_breakers: String;
  timeframe_for_marriage: String;
  family_details: String;
  hobbies: [String];
  interests: [String];
  distance: String;
  media: [String];
  isFeatured: boolean;
}
