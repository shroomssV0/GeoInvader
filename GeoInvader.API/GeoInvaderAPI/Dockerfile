# Use the Microsoft's official .NET 8.0 SDK image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS base
WORKDIR /app

# Set the ASP.NET Core environment to Development
ENV ASPNETCORE_ENVIRONMENT=Development

# Optionally, install additional tools you might need for development
# Install EF Core CLI tools
RUN dotnet tool install --global dotnet-ef
ENV PATH="${PATH}:/root/.dotnet/tools"

# Expose the port your application uses
EXPOSE 5291

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet build "GeoInvaderAPI.csproj" -c Debug -o /app/build

# The application is not published to the out directory, just built to /app/build
# Note: For development, you might run the app directly from the build directory
# Or you could run dotnet publish if you have a specific reason to do so

ENTRYPOINT ["sh", "-c", "dotnet ef database update && dotnet run --project GeoInvaderAPI.csproj --no-launch-profile"]

