'use client';
import CityVideoCard from './CityVideoCard';
import {useLanguage} from '@/context/LanguageContext';
import type {CityVideo} from '@/lib/cityVideoTypes';
export default function ApartmentLinkedVideos({videos}:{videos:CityVideo[]}){
 const {language}=useLanguage();
 return <section className="mx-auto max-w-6xl px-4 py-8"><h2 className="mb-4 text-2xl font-bold">{{ru:'Видео квартиры',ro:'Video al apartamentului',en:'Apartment video',uk:'Відео квартири',cs:'Video apartmánu'}[language]}</h2><div className="grid gap-4 md:grid-cols-2">{videos.map(video=><CityVideoCard key={video.id} video={video}/>)}</div></section>;
}
