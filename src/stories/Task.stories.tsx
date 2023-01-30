import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Task from "../components/Task";
import {TaskWithRedux} from "../components/TaskWithRedux";
import {ReduxStoreProviderDecorator} from "../store/ReduxStoreProviderDecorator";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/Task',
    component: TaskWithRedux,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        task: {
            id: 'dq', title: 'dqw', description: '',
            status: 0, priority: 0, startDate: '', deadline: '',
            todoListId: '', order: 0, addedDate: ''
        },
        todolistID: 'dqw'
    },
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TaskWithRedux> = (args) => <TaskWithRedux {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
    task: {
        id: 'dq', title: 'dqw', description: '',
        status: 0, priority: 0, startDate: '', deadline: '',
        todoListId: '', order: 0, addedDate: ''
    },
};


