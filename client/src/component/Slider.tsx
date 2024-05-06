import '../style/Slider.css'
import { useState, useEffect } from 'react';

interface Event {
    event_name: string;
    event_description: string;
    image: string;
    rating: number;
}

interface SliderProps {
    events: Event[];
}

// function Slider({ events }: SliderProps) {
//     const [imageIndex, setImageIndex] = useState(0)
//     const [autoPlay, setAutoplay] = useState(true)
//     let timeOut: number | null = null;

//     // console.log(imageIndex)

//     useEffect(() => {
//         if (autoPlay) {
//             timeOut = window.setTimeout(() => {
//                 showNextImage();
//             }, 5000);
//         }
//         return () => {
//             if (timeOut) {
//                 window.clearTimeout(timeOut);
//             }
//         }
//     }, [autoPlay, showNextImage])

//     function showPrevImage() {
//         setImageIndex(index => {
            
//             if (index === 0) return events.length - 1
//             return index - 1
//         })
//     }

//     function showNextImage() {
//         setImageIndex(index => {
//             if (index === events.length - 1) return 0
//             return index + 1
//         })
//     }

//     return (
//         <div className="slider-container">
//             <div className='left-button' onClick={showPrevImage}>&lt;</div>
//             <div className='carousel-container' onMouseEnter={() => {
//                 setAutoplay(false);
//                 if (timeOut) {
//                     window.clearTimeout(timeOut);
//                 }
//             }}
//                 onMouseLeave={() => { setAutoplay(true) }}>
//                 {events.map((event, index) => (
//                     // event.rating > 7 && (
//                     <div className='content-container' key={index} style={{ translate: `${-100 * imageIndex}%` }}>
//                         <div className="image-container">
//                             <img key={index} src={event.image} alt={event.event_name}></img>
//                         </div>
//                         <div className="info-container">
//                             <div className='info'>
//                                 <div className='title'>
//                                     {event.event_name}
//                                 </div>
//                                 <div className='description'>
//                                     {event.event_description}
//                                 </div>
//                                 <div className='rating'>
//                                     {event.rating}
//                                 </div>
//                             </div>
//                             <div className='button-container'>
//                                 <button className='get-ticket-button'>Get Ticket</button>
//                             </div>
//                         </div>
//                     </div>
//                     // )
//                 ))}
//             </div>
//             <div className='carousel-dot-container'>
//                 {events.map((_, index) => (
//                     _.rating > 7 &&(
//                     <div key={index} className={index === imageIndex ? 'carousel-dot active' : 'carousel-dot'} onClick={() => setImageIndex(index)}>
//                     </div>
//                     )
//                 ))}
//             </div>
//             <div className='right-button' onClick={showNextImage}>&gt;</div>
//         </div>
//     );
// }
function Slider({ events }: SliderProps) {
    console.log("events", events)
    const [imageIndex, setImageIndex] = useState(0)
    const [autoPlay, setAutoplay] = useState(true)
    let timeOut: number | null = null;

    // Create a new array with events that have a rating more than 7
    const filteredEvents = events.filter(event => event.rating > 7);

    useEffect(() => {
        if (autoPlay) {
            timeOut = window.setTimeout(() => {
                showNextImage();
            }, 5000);
        }
        return () => {
            if (timeOut) {
                window.clearTimeout(timeOut);
            }
        }
    }, [autoPlay, showNextImage])

    function showPrevImage() {
        setImageIndex(index => {
            
            if (index === 0) return filteredEvents.length - 1
            return index - 1
        })
    }

    function showNextImage() {
        setImageIndex(index => {
            if (index === filteredEvents.length - 1) return 0
            return index + 1
        })
    }

    return (
        <div className="slider-container">
            <div className='left-button' onClick={showPrevImage}>&lt;</div>
            <div className='carousel-container' onMouseEnter={() => {
                setAutoplay(false);
                if (timeOut) {
                    window.clearTimeout(timeOut);
                }
            }}
                onMouseLeave={() => { setAutoplay(true) }}>
                {filteredEvents.map((event: any, index: number) => (
                    <div className='content-container' key={index} style={{ translate: `${-100 * imageIndex}%` }}>
                        <div className="image-container">
                            <img key={index} src={event.image} alt={event.event_name} />
                        </div>
                        <div className="info-container">
                            <div className='info'>
                                <div className='title'>
                                    {event.event_name}
                                </div>
                                <div className='description'>
                                    {event.event_description}
                                </div>
                                <div className='rating'>
                                    {event.rating}
                                </div>
                            </div>
                            <div className='button-container'>
                                <button className='get-ticket-button'>Get Ticket</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='carousel-dot-container'>
                {filteredEvents.map((_: any, index: number) => (
                    <div key={index} className={index === imageIndex ? 'carousel-dot active' : 'carousel-dot'} onClick={() => setImageIndex(index)}>
                    </div>
                ))}
            </div>
            <div className='right-button' onClick={showNextImage}>&gt;</div>
        </div>
    );
}



export default Slider