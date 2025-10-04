
'use client';

import {
  Firestore,
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import type { User as FirebaseUser } from 'firebase/auth';

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
 * @param userId - The ID of the user submitting the review (reviewer).
 * @param reviewData - The performance review data.
 */
export function savePerformanceReview(
  firestore: Firestore,
  userId: string,
  reviewData: PerformanceReviewData
) {
  const reviewsCollection = collection(firestore, 'performanceReviews');

  let dataToSave;

  if (reviewData.type === 'manager-feedback') {
    dataToSave = {
      ...reviewData,
      userId: reviewData.reviewedUserId, // The user being reviewed
      reviewerId: userId, // The manager
      createdAt: serverTimestamp(),
    };
    // The 'reviewedUserId' field is redundant in the final object, so we can remove it.
    delete (dataToSave as any).reviewedUserId;
  } else {
    dataToSave = {
      ...reviewData,
      userId: userId, // The user doing the self-assessment
      reviewerId: userId, // For self-assessment, reviewer is the user themselves
      createdAt: serverTimestamp(),
    };
  }

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


export type OnboardingData = {
  employeeId: string;
  fullName: string;
  designation: string;
  contactPhone: string;
  role: string;
  department: string;
}

export function saveOnboardingData(
  firestore: Firestore,
  user: FirebaseUser,
  onboardingData: OnboardingData
) {
  const userRef = doc(firestore, 'users', user.uid);
  
  const dataToSave = {
    id: user.uid,
    contactEmail: user.email,
    ...onboardingData,
    onboarded: true,
  };

  setDoc(userRef, dataToSave, { merge: true })
    .catch((serverError) => {
      const permissionError = new FirestorePermissionError({
        path: userRef.path,
        operation: 'create',
        requestResourceData: dataToSave,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
}
