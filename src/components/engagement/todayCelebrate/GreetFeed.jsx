import { useEffect } from 'react';
import Slider from 'react-slick';
import useGreetStore from "../../../store/greetStore";
import GreetCard from '../Card/GreetCard.jsx';
import UpComingGreet from '../Card/upComingGreetCard.jsx';
import { RiRobot2Line, RiTimeLine } from "react-icons/ri";


const getRandomTagline = (type) => {
  const upCominBirthdayTaglines = [
    "Smiles, surprises, and celebrations incoming!",
    "We've got birthday stars on the horizon!",
    "Get ready to shower some birthday love soon!",
    "Heads up—cake and candles are on the way!",
    "The countdown to confetti has begun!",
    "Upcoming birthdays remind us to celebrate our people.",
    "Recognizing the special days of our amazing team.",
    "Celebrating life's moments—birthdays ahead!",
    "Here's to the incredible individuals turning a year bolder soon!"
  ];

  const upCominAnniversaryTaglines = [
    "Milestones approaching—thank you for growing with us!",
    "Honoring the journeys of those who make us better every day.",
    "Years of dedication coming up—get ready to celebrate!",
    "We're grateful for the time and talent—cheers to upcoming anniversaries!",
    "Join us soon in celebrating loyalty and commitment!",
    "Work anniversaries ahead—watch this space for the stars!",
    "Marking time, marking impact—anniversaries just around the corner.",
    "More chapters, more impact—let's honor the journey!",
    "Celebration incoming: Because dedication deserves recognition."
  ];

  const birthdayTaglines = [
  "Today's all about you—happy birthday and best wishes ahead!",
  "Let the celebrations begin! Wishing you a joyful birthday today!",
  "Cheers to your special day—may it be filled with laughter and cake!",
  "Another trip around the sun, and you're shining brighter than ever!",
  "Happy Birthday! Your presence makes today extra special!",
  "To a wonderful colleague—may your birthday bring success and smiles!",
  "Here's to good vibes, warm wishes, and a day as amazing as you!"
  ];

  const workAnniversaryTaglines = [
    "Celebrating your dedication and impact—Happy Work Anniversary today!",
    "One more year of greatness—thank you for growing with us!",
    "Your journey inspires us all—congratulations on your anniversary!",
    "Today marks a milestone in your incredible story with us—cheers!",
    "From day one to today, you've made a difference—Happy Anniversary!",
    "We're lucky to have you—thanks for another year of excellence!",
    "Your contributions define who we are—celebrating your anniversary with pride!"
  ];

  let taglines = ""
  switch (type){
    case "upComingBirthday":
      taglines = upCominBirthdayTaglines
      break;
    case "upComingAnniversary":
      taglines = upCominAnniversaryTaglines
      break;
    case "todayBirthday": 
      taglines = birthdayTaglines
      break;
    case "todayAnniversary":
      taglines = workAnniversaryTaglines;
      break;
    default:
      taglines = ["Celebrating our amazing team!"];
  }

  return taglines[Math.floor(Math.random() * taglines.length)];
};

const GreetFeed = () => {
  const { greet, fetchGreet, isLoading, error, fetchUpComingGreet, upComingGreet } = useGreetStore();

  useEffect(() => {
    fetchGreet();
    fetchUpComingGreet();
  }, [fetchGreet, fetchUpComingGreet]);

  const combinedList = [
    ...greet.birthdays.map(item => ({ ...item, type: "birthday", tagline: getRandomTagline("todayBirthday") })),
    ...greet.anniversaries.map(item => ({ ...item, type: "anniversary", tagline: getRandomTagline("todayAnniversary") }))
  ];

  const combinedUpComingList = [
    ...upComingGreet.birthdays.map(item => ({ ...item, type: "birthday", tagline: getRandomTagline("upComingBirthday") })),
    ...upComingGreet.anniversaries.map(item => ({ ...item, type: "anniversary", tagline: getRandomTagline("upComingAnniversary") }))
  ];

  if (error) return <div className="p-4 bg-red-100 text-red-700 mb-4">{error}</div>;
  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  const NextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md cursor-pointer z-10"
      onClick={onClick}
    >
      <svg className="w-5 h-5 text-gray-800 dark:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md cursor-pointer z-10"
      onClick={onClick}
    >
      <svg className="w-5 h-5 text-gray-800 dark:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  );

  const isMultipleToday = combinedList.length > 1;
  const isMultipleUpcoming = combinedUpComingList.length > 1;

  const baseSettings = {
    dots: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    cssEase: "ease-in-out",
    pauseOnHover: true
  };

  const todaySettings = {
    ...baseSettings,
    infinite: isMultipleToday,
    autoplay: isMultipleToday,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  const upcomingSettings = {
    ...baseSettings,
    infinite: isMultipleUpcoming,
    autoplay: isMultipleUpcoming,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };
 
  return (
    <div className="w-full mx-auto py-6 px-4 space-y-10">
      {greet && (greet.birthdays.length > 0 || greet.anniversaries.length > 0) ? (
     
      <Slider {...todaySettings}>
        {combinedList.map((item, index) => (
          <div key={index}>
            <GreetCard post={item} type={item.type} tagline={item.tagline} />
          </div>
        ))}
      </Slider>
      ):(
         <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                      <div className="bg-gradient-to-tr from-blue-200 to-purple-300 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-full shadow-lg">
                        <RiRobot2Line className="w-14 h-14 text-gray-400 dark:text-gray-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
                        No content yet
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                        <RiTimeLine className="w-4 h-4" />
                        <span>Waiting...</span>
                      </div>
          </div>
      )
      }

      {upComingGreet && (upComingGreet.birthdays.length > 0 || upComingGreet.anniversaries.length > 0) ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Upcoming Greetings </h2>
          <div className="relative  pb-8">
           <Slider {...upcomingSettings}>
            {combinedUpComingList.map((item, index) => (
              <div key={index}>
                <UpComingGreet post={item} type={item.type} tagline={item.tagline} />
              </div>
            ))}
            </Slider>
          </div>
        </div>
      ):(
         <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                      <div className="bg-gradient-to-tr from-blue-200 to-purple-300 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-full shadow-lg">
                        <RiRobot2Line className="w-14 h-14 text-gray-400 dark:text-gray-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
                        No content yet
                      </h3>

                      <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                        <RiTimeLine className="w-4 h-4" />
                        <span>Waiting...</span>
                      </div>
          </div>
      )}
    </div>
  );
};

export default GreetFeed;
