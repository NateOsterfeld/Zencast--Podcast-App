import React, { useState, useEffect } from 'react';
import CuratedListCard from '../../CuratedListCard/CuratedListCard';
import { useSpring, a } from 'react-spring';

const CuratedLists = ({curatedLists, getListPodcasts, direction }) => {
    const [directionStyle, setDirectionStyle] = useState();
    const fade = useSpring({from:{opacity: 0}, opacity: 1});
    const right = useSpring({from:{transform: 'translateX(0px)'}, transform: 'translateX(-900px)'});
    const left = useSpring({from:{transform: 'translateX(-900px)'}, transform: 'translateX(0px)'});

    useEffect(() => {
        direction === 'cl-right' && setDirectionStyle(right);
        direction === 'cl-left' && setDirectionStyle(left);
    })

    return (
        <a.div className="selection-component" style={fade}>
        	<a.div className="componentCarousel" style={directionStyle} > {
            curatedLists.map((curatedList, i) => {
                if (i < 10)
                    return <CuratedListCard
                        key={curatedList.id}
                        id={curatedList.id}
                        title={curatedList.title}
                        image={curatedList.podcasts[0].thumbnail}
                        podcasts={curatedList.podcasts}
                        getListPodcasts={getListPodcasts}
                        margin={10}
                    />
            })
        }
            </a.div>
        </a.div>
    )
}

export default CuratedLists;