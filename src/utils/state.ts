// Shared state

import { createStore } from "@stencil/store";

const { state, onChange } = createStore({
    user: null,
    context: null,
    app: {
        client: "2kAcJaj7GkBYg2Wp",
        redirect: "http://localui.arcgis.com:3333/redirect.html",
        portal: "https://dc.mapsqa.arcgis.com"
    }
});

onChange('user', value => {
    console.debug("Updated user", {user: value, context: value.context, hubRequestOptions: value.hubRequestOptions})
    state.user = value;
});

onChange('context', value => {
    console.debug("Updated context", {context: value})
    state.context = value;
    state.user = value._currentUser;
});

export default state;
