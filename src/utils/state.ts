// Shared state

import { createStore } from "@stencil/store";

const { state, onChange } = createStore({
    user: null,
    context: null
});

onChange('user', value => {
    state.user = value;
});

export default state;
