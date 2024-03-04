import { Footer } from "flowbite-react";


export default function About() {
  return (
    <div className='min-h-screen flex mt-10 justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About Colo<span className="text-gradient">Gram</span>
          </h1>
          <div className='text-md text-gray-500 text-justify flex mt-10 flex-col gap-6'>
            <p>
              Welcome to ColoGram! This is a website created by Aryan Mishra
              as a personal project to bridge the gap between students and college. 
              Aryan is a passionate developer who loves to learn about
              technology, coding, and everything in between.
            </p>

            <p>
              On this Site, you wll find regular announcements related to the different activities going on in our college
              such as activities and announcements relating to Academics, Examinations, Clubs and much more. Aryan is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like comments of other users and reply to
              them as well. We believe that our community can help
              each other grow and improve.
            </p>

            <div className="mt-5">
              <Footer.Copyright href="#" by="Aryan Mishra" year={new Date().getFullYear()}/>
            </div>
            <div className="flex justify-center overflow-auto pt-8">
              <img src="../WhatsApp Image 2023-09-09 at 17.59.44.jpg" alt="" className="w-[40%] h-[60%] rounded-xl shadow-2xl hover:-translate-y-6  self-center object-contain" />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
