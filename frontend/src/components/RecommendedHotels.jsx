import { useAppContext } from "../context/AppContext";
import { HotelCard } from "./HotelCard"
import Title from "./Title"
import { useState,useEffect } from "react";

function RecommendedHotels() {
    const { rooms,searchedCities } = useAppContext();
    const [recomonded, setRecomonded] = useState([]);
    
    const filterHotels = () => {
        const filteredHotels = rooms.slice().filter(room => searchedCities.includes(room.hotel.city));
        setRecomonded(filteredHotels)
    };
    useEffect(() => {
        filterHotels();
    }, [rooms, searchedCities])

    return recomonded.length > 0 &&  (
        <div className="flex flex-col  items-center justify-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
            <Title title='Recommended Hotels' subtitle='Discover Our handpicked selection of exceptional properties arround the world, offering unparalleled luxury and unforgettable experiences.' />
            <div className="flex flex-wrap items-center justify-center gap-6 mt-20 ">
                {recomonded.slice(0, 4).map((room, index) => (
                    <HotelCard key={room._id} room={room} index={index} />
                ))}
            </div>
        </div>
    )
}

export default RecommendedHotels