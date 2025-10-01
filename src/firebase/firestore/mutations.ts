'use client';

import {
  Firestore,
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

type PerformanceReviewData = {
  type: 'self-assessment';
  ratings: Record<string, number>;
  comments: string;
} | {
  type: 'manager-feedback';
  feedback: string;
  reviewedUserId: string;
};

/**
 * Saves a performance review to Firestore.
 * This is a non-blocking operation.
 * @param firestore - The Firestore instance.
 * @param userId - The ID of the user submitting the review.
 * @param reviewData - The performance review data.
 */
export function savePerformanceReview(
  firestore: Firestore,
  userId: string,
  reviewData: PerformanceReviewData
) {
  const reviewsCollection = collection(firestore, 'performanceReviews');

  const dataToSave = {
    ...reviewData,
    userId: reviewData.type === 'manager-feedback' ? reviewData.reviewedUserId : userId,
    reviewerId: userId,
    createdAt: serverTimestamp(),
  };

  addDoc(reviewsCollection, dataToSave)
    .catch((serverError) => {
      const permissionError = new FirestorePermissionError({
        path: reviewsCollection.path,
        operation: 'create',
        requestResourceData: dataToSave,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
}
