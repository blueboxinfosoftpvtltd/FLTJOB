#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "CFCallNumber.h"
#import "Diagnostic.h"
#import "Diagnostic_Bluetooth.h"
#import "Diagnostic_Calendar.h"
#import "Diagnostic_Camera.h"
#import "Diagnostic_Contacts.h"
#import "Diagnostic_Location.h"
#import "Diagnostic_Microphone.h"
#import "Diagnostic_Motion.h"
#import "Diagnostic_Notifications.h"
#import "Diagnostic_Reminders.h"
#import "Diagnostic_Wifi.h"
#import "CDVCamera.h"
#import "CDVExif.h"
#import "CDVJpegHeaderWriter.h"
#import "UIImage+CropScaleOrientation.h"
#import "CGPDFDocument.h"
#import "ReaderConstants.h"
#import "ReaderContentPage.h"
#import "ReaderContentTile.h"
#import "ReaderContentView.h"
#import "ReaderDocument.h"
#import "ReaderDocumentOutline.h"
#import "ReaderMainPagebar.h"
#import "ReaderMainToolbar+SDVReaderMainToolbarPassThrough.h"
#import "ReaderMainToolbar.h"
#import "ReaderThumbCache.h"
#import "ReaderThumbFetch.h"
#import "ReaderThumbQueue.h"
#import "ReaderThumbRender.h"
#import "ReaderThumbRequest.h"
#import "ReaderThumbsView.h"
#import "ReaderThumbView.h"
#import "ReaderViewController+SDVReaderViewControllerPassThrough.h"
#import "ReaderViewController.h"
#import "SDVReaderContentViewDoublePage.h"
#import "SDVReaderMainPagebar.h"
#import "SDVReaderMainToolbar.h"
#import "SDVReaderViewController.h"
#import "SDVThumbsMainToolbar.h"
#import "SDVThumbsViewController.h"
#import "SitewaertsDocumentViewer.h"
#import "ThumbsMainToolbar+SDVThumbsMainToolbarPassThrough.h"
#import "ThumbsMainToolbar.h"
#import "ThumbsViewController+SDVThumbsViewControllerPassThrough.h"
#import "ThumbsViewController.h"
#import "UIXToolbarView.h"
#import "CDVAssetLibraryFilesystem.h"
#import "CDVFile.h"
#import "CDVLocalFilesystem.h"
#import "CDVLocation.h"
#import "CDVInAppBrowser.h"
#import "CDVInAppBrowserNavigationController.h"
#import "CDVInAppBrowserOptions.h"
#import "CDVUIInAppBrowser.h"
#import "CDVWKInAppBrowser.h"
#import "CDVWKInAppBrowserUIDelegate.h"
#import "SelectorCordovaPlugin.h"
#import "CFCallNumber.h"

FOUNDATION_EXPORT double CordovaPluginsVersionNumber;
FOUNDATION_EXPORT const unsigned char CordovaPluginsVersionString[];

