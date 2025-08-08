
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import useAuthStore from '../store/store';
import usePostStore from '../store/postStore';
import useKudosStore from '../store/kudosStore';
import usePollStore from '../store/pollStore';
import useNotificationStore from '../store/notificationStore';
import { getsocket } from '../service/socketService';

let socket;

const useSocket = () => {
  const { isAuthenticated } = useAuthStore();
  const { addPost, updatePost, deletePost } = usePostStore();
  // const { addComment, updateComment, deleteComment } = useCommentStore();
  const { addKudos } = useKudosStore();
  const { addPoll, updatePoll } = usePollStore();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    if (isAuthenticated) {
      socket = getsocket();

      socket.on('connect', () => {
        console.log('Connected to Socket.io server');
      });

      // Post Events
      socket.on('newPost', (post) => {
        addPost(post);
      });

      socket.on('updatePost', (post) => {
        updatePost(post);
      });

      socket.on('deletePost', ({ postId }) => {
        deletePost(postId);
      });

      // Comment Events
      // socket.on('newComment', (comment) => {
      //   addComment(comment);
      // });

      // socket.on('updateComment', (comment) => {
      //   updateComment(comment);
      // });

      // socket.on('deleteComment', ({ commentId, postId }) => {
      //   deleteComment(commentId, postId);
      // });

      // Kudos Events
      socket.on('newKudos', (kudos) => {
        addKudos(kudos);
      });

      // Poll Events
      socket.on('newPoll', (poll) => {
        addPoll(poll);
      });

      socket.on('updatePoll', (poll) => {
        updatePoll(poll);
      });

      // Notification Events
      socket.on('notification', (notification) => {
        addNotification(notification);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from Socket.io server');
      });

      socket.on('error', (error) => {
        console.error('Socket.io error:', error);
      });

      return () => {
        if (socket) socket.disconnect();
      };
    }
  }, [
    isAuthenticated,
    addPost,
    updatePost,
    deletePost,
    // addComment,
    // updateComment,
    // deleteComment,
    addKudos,
    addPoll,
    updatePoll,
    addNotification,
  ]);

  return socket;
};

export default useSocket;
