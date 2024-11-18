import { useState, useRef } from "react";
import SidebarNav from "./SidebarNav";
import CreatedRides from "./CreatedRides";
import JoinedRides from "./JoinedRides";
import TripInfo from "./TripInfo";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
    const isScrolling = useRef(false);
    const [currentSlide, setCurrentSlide] = useState('Created Rides');
    const [searchBar, setSearchBar] = useState('');

    const [createdRideViewOpen, setCreatedRideViewOpen] = useState(false);
    const [createdRide, setCreatedRide] = useState({});
    const [joinedRideViewOpen, setJoinedRideViewOpen] = useState(false);
    const [joinedRide, setJoinedRide] = useState({});

    const handleSlideChange = (slide) => {
        setCurrentSlide(slide);
    };

    const handleOpenCreatedDisplay = (trip) => {
        toggleSidebar();
        setCreatedRide(trip);
        setCreatedRideViewOpen(true);
    };

    const handleCloseCreatedDisplay = () => {
        toggleSidebar();
        setCreatedRide({});
        setCreatedRideViewOpen(false);
    }

    const handleOpenJoinedDisplay = (trip) => {
        toggleSidebar();
        setJoinedRide(trip);
        setJoinedRideViewOpen(true);
    };

    const handleCloseJoinedDisplay = () => {
        toggleSidebar();
        setJoinedRide({});
        setJoinedRideViewOpen(false);
    };

    const handleHorizontalScroll = (e) => {
        const container = e.currentTarget;

        if (!isScrolling.current) {
            isScrolling.current = true;

            requestAnimationFrame(() => {
                container.scrollLeft += e.deltaY * 2;
                isScrolling.current = false;
            });
        }
    };

    const requestElements = (createdRide.requests ?
        createdRide.requests.map((passenger, index) => (
            <div 
                key={index}
                className='flex'
            >
                <button
                    className='text-sm p-1 bg-green-500 rounded-l-3xl hover:scale-95'
                >
                    <FontAwesomeIcon 
                        className='px-1'
                        icon={faCheck}
                        size='lg'
                    />
                </button>

                <button
                    className='text-sm p-1 bg-gray-500 text-nowrap hover:scale-95'
                >
                    {passenger}
                </button>

                <button
                    className='text-sm p-1 bg-red-500 rounded-r-3xl hover:scale-95'
                >
                    <FontAwesomeIcon 
                        className='px-1'
                        icon={faX}
                        size='lg'
                    />
                </button>
            </div>
        )) :
        <h1>No Requests</h1>
    );

    return (
        <>
            <div className={'absolute flex justify-end top-[20%] right-0 h-2/3 w-80 md:w-96 overflow-x-hidden pointer-events-none z-20'}>
                <div className={`flex w-full h-full pointer-events-auto ${sidebarOpen ? 'slide-in3' : 'slide-out3'}`}>
                    <button
                        className='h-1/4 min-w-2 bg-white rounded-l-md hover:scale-95'
                        onClick={toggleSidebar}
                    >
                    </button>
                    <div className="flex flex-col w-full h-full bg-base p-4">
                        <SidebarNav currentSlide={currentSlide} handleSlideChange={handleSlideChange} />
                        <input
                            type='text'
                            className='p-2 mt-3 rounded-md'
                            placeholder='Search...'
                            value={searchBar}
                            onChange={(e) => setSearchBar(e.target.value)}
                        />
                        {currentSlide === 'Created Rides' && (
                            <CreatedRides searchBar={searchBar} toggleSidebar={toggleSidebar} handleOpenDisplay={handleOpenCreatedDisplay} />
                        )}
                        {currentSlide === 'Joined Rides' && (
                            <JoinedRides searchBar={searchBar} toggleSidebar={toggleSidebar} handleOpenDisplay={handleOpenJoinedDisplay} />
                        )}
                    </div>
                </div>
            </div>

            {createdRideViewOpen && (
                <TripInfo
                    openTrip={createdRide}
                    handleCloseDisplayJoin={handleCloseCreatedDisplay}
                >
                    <button
                        className='text-sm py-1 px-4 rounded-3xl bg-red-500 hover:scale-95'
                    >
                        Delete
                    </button>
                    <div>
                        <h2 className='font-bold text-gray-400'>Requests:</h2>
                        <div
                            className='w-full overflow-x-auto flex space-x-3 mt-1 passenger-scroll-container pb-2'
                            onWheel={handleHorizontalScroll}
                        >
                            {requestElements}
                        </div>
                    </div>
                </TripInfo>
            )}

            {joinedRideViewOpen && (
                <TripInfo
                    openTrip={joinedRide}
                    handleCloseDisplayJoin={handleCloseJoinedDisplay}
                >
                    <button
                        className='text-sm py-1 px-4 rounded-3xl bg-red-500 hover:scale-95'
                    >
                        Leave
                    </button>
                </TripInfo>
            )}
        </>
    );
};

export default Sidebar;