import { bus } from "../../main";
import { router } from "./../../router";
import Vue from "vue";

const state = {
  selectedChannelID: null,
  channelName: null,
  channels: {}
};

const getters = {
  selectedChannelID(state) {
    return state.selectedChannelID;
  },
  channels(state) {
    return state.channels;
  },
  channelName(state) {
    return state.channelName;
  }
};

const actions = {
  channel(context, channel) {
    context.commit("channel", channel);
  },
  selectedChannelID(context, channelID) {
    context.commit("selectedChannelID", channelID);
  },
  setChannelName(context, name) {
    context.commit("setChannelName", name);
  },
  updateChannelLastMessage(context, channelID) {
    context.commit("updateChannelLastMessage", channelID);
  }
};

const mutations = {
  updateChannelLastMessage(state, channelID) {
    Vue.set(state.channels[channelID], "lastMessaged", Date.now());
  },
  addAllChannels(state, channels) {
    Vue.set(state, "channels", channels);
  },
  channel(state, channel) {
    Vue.set(state.channels, channel.channelID, channel);
  },
  selectedChannelID(state, channelID) {
    state.selectedChannelID = channelID;
  },
  setChannelName(state, name) {
    state.channelName = name;
  }
};

export default {
  namespace: true,
  state,
  actions,
  mutations,
  getters
};
