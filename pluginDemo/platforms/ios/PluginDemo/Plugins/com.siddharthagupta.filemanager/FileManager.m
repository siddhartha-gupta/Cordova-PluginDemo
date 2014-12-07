//
//  FileManager.m
//  
//
//  Created by Siddhartha Gupta on 07/12/14.
//
//

#import <Foundation/Foundation.h>
#import "FileManager.h"

@implementation FileManager

-(void)documentsPath:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = nil;

    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[paths objectAtIndex:0]];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void)libraryPath:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = nil;
    
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES);
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[paths objectAtIndex:0]];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)checkFileExist:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = nil;
    NSString* sourcePath = [command.arguments objectAtIndex:0];
    
    if ([[NSFileManager defaultManager] fileExistsAtPath:sourcePath]) {
        // file exists
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"true"];
    } else {
        // file not found
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"false"];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)moveFile:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = nil;

    NSString* sourcePath = [command.arguments objectAtIndex:0];
    NSString* targetPath = [command.arguments objectAtIndex:1];
    NSError* error = nil;
    NSString *errorDesc = @"";
    NSFileManager *fileManager = [NSFileManager defaultManager];

    if ([fileManager fileExistsAtPath:targetPath]) {
        [fileManager copyItemAtPath:sourcePath toPath:targetPath error:&error];
        if (error) {
            errorDesc = [NSString stringWithFormat:@"%@ %@", @"Error while moving the file", targetPath];
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:errorDesc];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"File copy created succesfully"];
        }
    } else {
        errorDesc = [NSString stringWithFormat:@"%@ %@", @"File not found", targetPath];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:errorDesc];
    }
    
    if (![fileManager removeItemAtPath:sourcePath error:&error]) {
        errorDesc = [NSString stringWithFormat:@"%@ %@", @"Error while deleting the file", targetPath];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:errorDesc];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:targetPath];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)copyFile:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = nil;

    NSString* sourcePath = [command.arguments objectAtIndex:0];
    NSString* targetPath = [command.arguments objectAtIndex:1];
    NSError* error = nil;
    NSString *errorDesc = @"";
    NSFileManager *fileManager = [NSFileManager defaultManager];

    if ([fileManager fileExistsAtPath:targetPath]) {
        [fileManager copyItemAtPath:sourcePath toPath:targetPath error:&error];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:targetPath];
        if (error) {
            errorDesc = [NSString stringWithFormat:@"%@ %@", @"Error while moving the file", targetPath];
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:errorDesc];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"File copy created succesfully"];
        }
    } else {
        errorDesc = [NSString stringWithFormat:@"%@ %@", @"File not found", targetPath];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:errorDesc];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)renameFile:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = nil;

    NSString* source = [command.arguments objectAtIndex:0];
    NSString* newFilename = [command.arguments objectAtIndex:1];
    NSError* error;
    NSString *errorDesc = @"";
    NSString *newPath = [[source stringByDeletingLastPathComponent] stringByAppendingPathComponent:newFilename];
    
    if(![[NSFileManager defaultManager] moveItemAtPath:source toPath:newPath error:&error]) {
        errorDesc = [NSString stringWithFormat:@"%@ %@", @"Error while renaming the file", source];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:errorDesc];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:newFilename];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


@end