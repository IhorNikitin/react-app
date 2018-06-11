import React from 'react';
import { mount, shallow } from 'enzyme';
import events from '../../mocks/conferences';
import EventsList from "./EventsList";
import Loader from '../common/Loader';
import { EventRecord } from '../../ducks/events';

const EventsTest = events.map(event => new EventRecord({...event, uid: Math.random().toString()}));

it('should render loader', () => {
    const container = shallow(<EventsList loading />);
    expect(container.contains(<Loader/>));
});

it('should render events', () => {
    const container = shallow(<EventsList events={EventsTest}/>);
    const rows = container.find('.test__row');

    expect(rows.length).toEqual(EventsTest.length);
});

it('should request fetch data', (done) => {
    mount(<EventsList events = {[]} fetchAll={done}/>)
})

it('should select event', () => {
    let selected = null;
    const selectEvent = (uid) => selected = uid;

    const container = mount(<EventsList
        events = {EventsTest}
        fetchAll = {() => {}}
        selectEvent = {selectEvent}
    />);

    container.find('.test__row').first().simulate('click');

    expect(selected).toEqual(EventsTest[0].uid);
})