import {bus} from '../../main'
import {router} from './../../router'
import Vue from 'vue';

const state = {
  notifications: []
}

const getters = {
  notifications(state) {
    return state.notifications;
  }
}

const actions = {
  addAllNotifications(context, notifications) {
    context.commit('addAllNotifications', notifications)
  },
  messageCreatedNotification(context, notification) {
    const {guildID, channelID, lastMessageID, sender} = notification;


    let find = context.state.notifications.find(item => {
      return item.channelID === channelID
    })
    if (find) {
      return context.commit('messageCreatedNotification', {exists: true, notification: {channelID, lastMessageID,sender}});
    } 
    context.commit('messageCreatedNotification', {exists: false, notification: {channelID, lastMessageID, sender, count: 1}});
    
  }
}

const mutations = {
  addAllNotifications(state, notifications){
    Vue.set(state, 'notifications', notifications);
  },
  messageCreatedNotification(state, data) {
    const {exists, notification} = data;
    if (exists) {
      for (let i = 0; i < state.notifications.length; i++) {
        if (state.notifications[i].channelID === notification.channelID) {
          const count = state.notifications[i].count;
          Vue.set(state.notifications[i], 'count', count + 1);
          Vue.set(state.notifications[i], 'lastMessageID', data.notification.lastMessageID);
          Vue.set(state.notifications[i], 'sender', data.notification.sender);
          break;
        }
      }
      return;
    }
    state.notifications.push(notification);
  }
}

export default {
  namespace: true,
  state,
  actions,
  mutations,
  getters
}