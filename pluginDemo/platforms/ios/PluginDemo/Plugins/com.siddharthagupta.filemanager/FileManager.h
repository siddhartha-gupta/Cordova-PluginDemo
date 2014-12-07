//
//  FileManager.h
//  
//
//  Created by Siddhartha Gupta on 07/12/14.
//
//

#import <Cordova/CDV.h>
#import <Foundation/Foundation.h>
#import <Foundation/NSData.h>

@interface FileManager : CDVPlugin

- (void)documentsPath:(CDVInvokedUrlCommand*)command;
- (void)libraryPath:(CDVInvokedUrlCommand*)command;
- (void)checkFileExist:(CDVInvokedUrlCommand*)command;
- (void)moveFile:(CDVInvokedUrlCommand*)command;
- (void)copyFile:(CDVInvokedUrlCommand*)command;
- (void)renameFile:(CDVInvokedUrlCommand*)command;

@end
