// message = { type: 'error'||'success', message: '', /* ttl = Number */}
const addSystemMessage = (store, { type, message, ttl }) => {
  return {
    ...store,
    messages: [...store.messages, {
      type,
      message,
      ttl
    }]
  }
}

export default {
  addSystemMessage
}
